# Instructions to run script:
# install python and install dependencies via pip with the command:
# install this specific version of chrome and make sure chromedriver version matches! https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.70/win64/chrome-win64.zip
# pip install selenium psutil
# install chrome driver from https://chromedriver.chromium.org/downloads
# modify the chrome_driver_path variable to point to the location of the chrome driver
chrome_driver_path = "C:\\ProgramData\\chocolatey\\bin\\chromedriver.exe"
# point this to wherever you have the chrome for testing installed
chrome_binary_path = 'C:\\Program Files\\Google\\chrome-win64\\chrome.exe'
#chrome_binary_path = 'C:\\Users\\kd8tb\\Documents\\GitHub\\CPS691Project\\local\\chrome-win64\\chrome.exe'
# modify the url variable to point to the url of the website you want to test
url = 'http://localhost:4200/Views/animation-pulse' #"https://www.google.com/"

test_site_dict = {
    'Angular' : ['http://localhost:4200/Views/animation-ball', 'http://localhost:4200/Views/animation-fade', 'http://localhost:4200/Views/animation-pulse'], 
    'React' : [], 
    'Vue' : [], 
    'Blazor' : []
}

# modify the test_duration variable to change the length of the test (in seconds)
test_duration = 300000
# modify the csv_file output path
csv_file = "test_results.csv"
import time
import csv
import psutil
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import psutil

# ===============================  MEASUREMENT FUNCTIONS ============================

# Function to measure memory usage of the Chrome process
def get_chrome_memory_usage(pid):
    process = psutil.Process(pid)
    return process.memory_info().vms / (1024 * 1024)  # Memory usage in MB

# Function to measure the frame rate of the web page using Selenium. This function does not work properly.
# def get_frame_rate(driver):
    # try:
    #     frame_rate = driver.execute_script("return window.performance.now() / 1000;")
    #     return int(frame_rate)
    # except Exception as e:
    #     print(f"Error while getting frame rate: {e}")
    #     return None
def get_current_frame_rate(driver):
    # Get performance logs and extract frame rate data
    frame_rate_data = []
    logs = driver.get_log('browser')
    print(logs)
    for log in logs:
        if 'requestAnimationFrame' in log['message']:
            frame_rate_data.append(log)

    if frame_rate_data:
        latest_frame_rate_entry = frame_rate_data[-1]
        message = latest_frame_rate_entry['message']
        try:
            frame_rate = float(message.split('"frameRate":')[1].split('}')[0])
            return frame_rate
        except (ValueError, IndexError) as e:
            print(f"Error while parsing frame rate data: {e}")
            return None
    else:
        print("No frame rate data found in logs.")
        return None
    


def estimate_frame_rate(driver):
    # Define a JavaScript function to measure the frame rate
    script = """
    var callback = arguments[0];
    new Promise(function(resolve, reject) {
        var lastTime = performance.now();
        var frameCount = 0;
        function measureFrameRate(time) {
            frameCount++;
            var deltaTime = time - lastTime;
            if (deltaTime >= 1000) {  // Calculate FPS every second
                var fps = frameCount / (deltaTime / 1000);
                resolve(fps);
                lastTime = time;
                frameCount = 0;
            } else {
                requestAnimationFrame(measureFrameRate);
            }
        }
        requestAnimationFrame(measureFrameRate);
    }).then(function(fps) {
        callback(fps);
    });
    """
    # Set a longer script timeout
    driver.set_script_timeout(5)
    # Execute the script asynchronously
    frame_rate = driver.execute_async_script(script)
    return frame_rate

def get_chrome_power_consumption(pid):
    try:
        process = psutil.Process(pid)
        power_usage = process.cpu_percent() / 100  # CPU usage as a fraction
        return power_usage
    except Exception as e:
        print(f"Error while getting power consumption: {e}")
        return None


# ===========================  TEST IMPLEMENTATION ======================
def write_csv_for_test():
    print("This is a placeholder")
    #Print the results with custom filename IE: Angular_performance_results_1

def test_webpage(duration, urls_to_webpages):
    #Iterate over each URL and run tests 
    for url in urls_to_webpages:
        url = 0
        #Run tests on each webpage for the determined amount of time
        write_csv_for_test() #Write results to a CSV
        #Quit the driver 

# Initialize Chrome WebDriver
chrome_service = ChromeService(chrome_driver_path)
chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = chrome_binary_path  # Specify the path to the Chrome binary
# Create a Chrome browser instance with the performance logging capability
chrome_options.add_argument('start-maximized')
chrome_options.add_argument('disable-infobars')
chrome_options.add_argument('--enable-logging=performance')
chrome_options.add_argument("--disable-notifications")
chrome_options.add_experimental_option("excludeSwitches",["enable-automation"])
chrome_options.set_capability('goog:loggingPrefs', {'performance': 'ALL'})
#chrome_options.add_argument("--headless")  # Run Chrome in headless mode
driver =  webdriver.Chrome(service=chrome_service, options=chrome_options)
print(driver.capabilities['browserVersion'])
print(driver.capabilities['chrome']['chromedriverVersion'].split(' ')[0])
# Create a CSV file to store the results
# modify name for test

# Ask the user to input the number of seconds to run each test, then begin the test. 
test_duration = 300
# Ask the user what test they would like to run
test_webpage(test_duration, url)

# Open the web page and start logging performance data
# Measure page load time 
start = time.time()
driver.get(url)
end = time.time()
page_load_time = (end - start)
print(page_load_time)


with open(csv_file, 'w', newline='') as csvfile:
    fieldnames = ['Time (s)', 'Memory Usage (MB)', 'Frame Rate (FPS)', 'Power Consumption (W)']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    fps_counter = 0
    start_time = time.time()
    while time.time() - start_time < test_duration:
        time_elapsed = time.time() - start_time
        memory_usage = get_chrome_memory_usage(driver.service.process.pid)
        frame_rate = estimate_frame_rate(driver)
        power_consumption = get_chrome_power_consumption(driver.service.process.pid)
        writer.writerow({'Time (s)': time_elapsed, 'Memory Usage (MB)': memory_usage, 'Frame Rate (FPS)': frame_rate, 'Power Consumption (W)': power_consumption})
        time.sleep(1)

end_time = time.time()
fps = fps_counter / (end_time - start_time)
print(f"FPS: {fps}")
# Close the browser and ChromeDriver
driver.quit()

print(f"Performance data saved to {csv_file}")
