import time
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("http://localhost:3000/")

for i in range(60):
    memory_usage = driver.execute_script("""
        if (window.crossOriginIsolated) {
            return performance.measureUserAgentSpecificMemory();
        } else {
            return 'performance.measureUserAgentSpecificMemory() is not available in this browser';
        }
    """)

    print(f"Memory usage at second {i}: {memory_usage}")

    time.sleep(1)