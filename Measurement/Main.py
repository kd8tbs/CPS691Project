# Instructions to run script:
# install python and install dependencies via pip with the command:
# pip install selenium psutil
# install chrome driver from https://chromedriver.chromium.org/downloads
# modify the chrome_driver_path variable to point to the location of the chrome driver
chrome_driver_path = "C:\\ProgramData\\chocolatey\\bin\\chromedriver.exe"
# modify the url variable to point to the url of the website you want to test
url = "http://localhost:3000"
# modify the test_duration variable to change the length of the test (in seconds)
test_duration = 60
# modify the csv_file output path
csv_file = "performance_results.csv"
import time
import csv
import psutil
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService

# Function to measure memory usage of the Chrome process
def get_chrome_memory_usage(pid):
    process = psutil.Process(pid)
    return process.memory_info().vms / (1024 * 1024)  # Memory usage in MB

# Function to measure the frame rate of the web page using Selenium. This function does not work properly.
def get_frame_rate(driver):
    try:
        frame_rate = driver.execute_script("return window.performance.now() / 1000;")
        return int(frame_rate)
    except Exception as e:
        print(f"Error while getting frame rate: {e}")
        return None

# This is a hacky way to get the website frame rate. It works by measuring the time it takes to scroll the page by 1 pixel. It is not the most accurate but it is the best I can do with the deadline.
def estimate_frame_rate(driver):
    frame_start_time = time.time()
    driver.execute_script("performance.mark('frame_start');")
    # Perform some action that causes rendering, such as scrolling, clicking, or loading a new page element
    # For example, you can scroll the page to trigger a reflow.
    driver.execute_script("window.scrollTo(0, 1);")
    driver.execute_script("performance.mark('frame_end');")
    frame_end_time = time.time()
    
    # Calculate the frame rate
    frame_duration = (frame_end_time - frame_start_time) * 1000  # Convert to milliseconds
    frame_rate = 1000 / frame_duration  # Calculate frame rate in frames per second (FPS)
    return int(frame_rate)




# Initialize Chrome WebDriver
chrome_service = ChromeService(chrome_driver_path)
chrome_options = webdriver.ChromeOptions()
#chrome_options.add_argument("--headless")  # Run Chrome in headless mode
driver = webdriver.Chrome(service=chrome_service, options=chrome_options)

# Create a CSV file to store the results
# modify name for test

# Open the web page and start logging performance data
driver.get(url)

with open(csv_file, 'w', newline='') as csvfile:
    fieldnames = ['Time (s)', 'Memory Usage (MB)', 'Frame Rate (FPS)']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    start_time = time.time()
    while time.time() - start_time < test_duration:
        time_elapsed = time.time() - start_time
        memory_usage = get_chrome_memory_usage(driver.service.process.pid)
        frame_rate = estimate_frame_rate(driver)
        writer.writerow({'Time (s)': time_elapsed, 'Memory Usage (MB)': memory_usage, 'Frame Rate (FPS)': frame_rate})
        time.sleep(1)

# Close the browser and ChromeDriver
driver.quit()

print(f"Performance data saved to {csv_file}")
