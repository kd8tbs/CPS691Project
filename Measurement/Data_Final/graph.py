import pandas as pd
import matplotlib.pyplot as plt
import os
import csv



class TestData:
    test_csv_path = None
    name = None
    data = None
    page_load_time = None
    def __init__(self, test_csv_path, name):
        self.test_csv_path = test_csv_path
        self.name = name
        self.data = pd.read_csv(test_csv_path)
        self.page_load_time = None
        with open('page_load_time.csv', 'r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip the header
            for row in reader:
                if row[1] == self.test_csv_path:
                    self.page_load_time = float(row[0])
        
    def get_average_frame_rate(self):
        return self.data['Frame Rate (FPS)'].mean()
    
    def get_average_memory_usage(self):
        return self.data['Memory Usage (MB)'].mean()
    
    def get_page_load_time(self):
        return self.page_load_time
    
# Create arrays of test data objects
bouncing_ball_tests = [ TestData('angular_boucing_ball_1k.csv', 'Angular'),
                        TestData('react_bouncing_balls_1k.csv', 'React'),
                        TestData('vue_bouncing_balls_1k.csv', 'Vue'),
                        TestData('blazor_bouncing_balls_1k.csv', 'Blazor')]

fading_tests = [ TestData('angular_fade_1k.csv', 'Angular'),
                TestData('react_fade_1k.csv', 'React'),
                TestData('vue_fade_1k.csv', 'Vue'),
                TestData('blazor_fade_1k.csv', 'Blazor')]

pulse_tests = [ TestData('angular_pulse_1k.csv', 'Angular'), 
                TestData('react_pulse_1k.csv', 'React'),
                TestData('vue_pulse_1k.csv', 'Vue'),
                TestData('blazor_pulse_1k.csv', 'Blazor')]

all_tests = bouncing_ball_tests + fading_tests + pulse_tests

# # Create bar charts comparing the average frame rate of bouncing ball tests
# bouncing_ball_frame_rates = [test.get_average_frame_rate() for test in bouncing_ball_tests]
# plt.bar([test.name for test in bouncing_ball_tests], bouncing_ball_frame_rates)
# plt.title("Average Frame Rate of Bouncing Ball Tests")
# plt.xlabel("Framework")
# plt.ylabel("Average Frame Rate (FPS)")
# plt.savefig("bouncing_ball_frame_rates.png")
# plt.close()
# # Create bar charts comparing the average frame rate of fading tests
# fading_frame_rates = [test.get_average_frame_rate() for test in fading_tests]
# plt.bar([test.name for test in fading_tests], fading_frame_rates)
# plt.title("Average Frame Rate of Fading Tests")
# plt.xlabel("Framework")
# plt.ylabel("Average Frame Rate (FPS)")
# plt.savefig("fading_frame_rates.png")
# plt.close()
# # Create bar charts comparing the average frame rate of pulse tests
# pulse_frame_rates = [test.get_average_frame_rate() for test in pulse_tests]
# plt.bar([test.name for test in pulse_tests], pulse_frame_rates)
# plt.title("Average Frame Rate of Pulse Tests")
# plt.xlabel("Framework")
# plt.ylabel("Average Frame Rate (FPS)")
# plt.savefig("pulse_frame_rates.png")
# plt.close()

# # Create line graph of frame rate over time in bouncing ball tests
# for test in bouncing_ball_tests:
#     plt.plot(test.data['Time (s)'], test.data['Frame Rate (FPS)'], label=test.name)
# plt.title("Frame Rate Over Time (Bouncing Ball Tests)")
# plt.xlabel("Time (s)")
# plt.ylabel("Frame Rate (FPS)")
# plt.legend()
# plt.savefig("bouncing_ball_frame_rate_over_time.png")
# plt.close()

# # Create line graph of frame rate over time in fading tests
# for test in fading_tests:
#     plt.plot(test.data['Time (s)'], test.data['Frame Rate (FPS)'], label=test.name)
# plt.title("Frame Rate Over Time (Fading Tests)")
# plt.xlabel("Time (s)")
# plt.ylabel("Frame Rate (FPS)")
# plt.legend()
# plt.savefig("fading_frame_rate_over_time.png")
# plt.close()

# # Create line graph of frame rate over time in pulse tests
# for test in pulse_tests:
#     plt.plot(test.data['Time (s)'], test.data['Frame Rate (FPS)'], label=test.name)
# plt.title("Frame Rate Over Time (Pulse Tests)")
# plt.xlabel("Time (s)")
# plt.ylabel("Frame Rate (FPS)")
# plt.legend()
# plt.savefig("pulse_frame_rate_over_time.png")
# plt.close()

# # Create bar chart of average page load times per framework
# page_load_times = [test.get_page_load_time() if test.get_page_load_time() is not None else 0 for test in all_tests]
# plt.bar([test.name for test in all_tests], page_load_times)
# plt.title("Average Page Load Time")
# plt.xlabel("Framework")
# plt.ylabel("Page Load Time (s)")
# plt.savefig("page_load_times.png")
# plt.close()

# # Create bar chart of average frame rate per framework
# frame_rates = [test.get_average_frame_rate() for test in all_tests]
# plt.bar([test.name for test in all_tests], frame_rates)
# plt.title("Average Frame Rate")
# plt.xlabel("Framework")
# plt.ylabel("Frame Rate (FPS)")
# plt.savefig("frame_rate_all_test_average.png")
# plt.close()

# # Create bar chart of average memory usage per framework
# memory_usages = [test.get_average_memory_usage() for test in all_tests]
# plt.bar([test.name for test in all_tests], memory_usages)
# plt.title("Average Memory Usage")
# plt.xlabel("Framework")
# plt.ylabel("Memory Usage (MB)")
# plt.savefig("memory_usage_all_test_average.png")
# plt.close()

# # Create memory usage over time line graphs of bouncing ball tests
# for test in bouncing_ball_tests:
#     plt.plot(test.data['Time (s)'], test.data['Memory Usage (MB)'], label=test.name)
# plt.title("Memory Usage Over Time (Bouncing Ball Tests)")
# plt.xlabel("Time (s)")
# plt.ylabel("Memory Usage (MB)")
# plt.legend()
# plt.savefig("bouncing_ball_memory_usage_over_time.png")
# plt.close()

# # Create memory usage over time line graphs of fading tests
# for test in fading_tests:
#     plt.plot(test.data['Time (s)'], test.data['Memory Usage (MB)'], label=test.name)
# plt.title("Memory Usage Over Time (Fading Tests)")
# plt.xlabel("Time (s)")
# plt.ylabel("Memory Usage (MB)")
# plt.legend()
# plt.savefig("fading_memory_usage_over_time.png")
# plt.close()

# # Create memory usage over time line graphs of pulse tests
# for test in pulse_tests:
#     plt.plot(test.data['Time (s)'], test.data['Memory Usage (MB)'], label=test.name)
# plt.title("Memory Usage Over Time (Pulse Tests)")
# plt.xlabel("Time (s)")
# plt.ylabel("Memory Usage (MB)")
# plt.legend()
# plt.savefig("pulse_memory_usage_over_time.png")
# plt.close()
import matplotlib.pyplot as plt
import numpy as np

font_size = 14
# Function to create hatched patterns for bars
def hatch_patterns(n):
    patterns = ['o', 's', '^', 'v', '<', '>', 'D', 'P', '*', 'H']
    return [patterns[i % len(patterns)] for i in range(n)]

# Set the default hatch patterns
bouncing_ball_patterns = hatch_patterns(len(bouncing_ball_tests))
fading_patterns = hatch_patterns(len(fading_tests))
pulse_patterns = hatch_patterns(len(pulse_tests))
all_test_patterns = hatch_patterns(len(all_tests))

# Create bar charts comparing the average frame rate of bouncing ball tests
for i, test in enumerate(bouncing_ball_tests):
    plt.bar(test.name, test.get_average_frame_rate(), color='gray')

plt.xlabel("Framework", fontsize=font_size)
plt.ylabel("Average Frame Rate (FPS)", fontsize=font_size)
plt.savefig("bouncing_ball_frame_rates.png")
plt.close()

# Create bar charts comparing the average frame rate of fading tests
for i, test in enumerate(fading_tests):
    plt.bar(test.name, test.get_average_frame_rate(), color='gray')

plt.xlabel("Framework", fontsize=font_size)
plt.ylabel("Average Frame Rate (FPS)", fontsize=font_size)
plt.savefig("fading_frame_rates.png")
plt.close()

# Create bar charts comparing the average frame rate of pulse tests
for i, test in enumerate(pulse_tests):
    plt.bar(test.name, test.get_average_frame_rate(), color='gray')

plt.xlabel("Framework", fontsize=font_size)
plt.ylabel("Average Frame Rate (FPS)", fontsize=font_size)
plt.savefig("pulse_frame_rates.png")
plt.close()

# # Create line graph of frame rate over time in bouncing ball tests
# for test, pattern in zip(bouncing_ball_tests, bouncing_ball_patterns):
#     plt.plot(test.data['Time (s)'], test.data['Frame Rate (FPS)'], label=test.name, color='gray', linestyle='-', marker=pattern)

# plt.xlabel("Time (s)")
# plt.ylabel("Frame Rate (FPS)")
# plt.legend()
# plt.savefig("bouncing_ball_frame_rate_over_time.png")
# plt.close()

# # Create line graph of frame rate over time in bouncing ball tests
# for i, test in enumerate(bouncing_ball_tests):
#     # Only plot every 5th data point (adjust as needed)
#     plt.plot(test.data['Time (s)'][::5], test.data['Frame Rate (FPS)'][::5], label=test.name, color='gray', linestyle='-', marker='o')

# plt.xlabel("Time (s)")
# plt.ylabel("Frame Rate (FPS)")
# plt.legend()
# plt.savefig("bouncing_ball_frame_rate_over_time.png")
# plt.close()

# # Create line graph of frame rate over time in fading tests
# for i, test in enumerate(fading_tests):
#     # Only plot every 5th data point (adjust as needed)
#     plt.plot(test.data['Time (s)'][::5], test.data['Frame Rate (FPS)'][::5], label=test.name, color='gray', linestyle='-', marker='o')

# plt.xlabel("Time (s)")
# plt.ylabel("Frame Rate (FPS)")
# plt.legend()
# plt.savefig("fading_frame_rate_over_time.png")
# plt.close()

# # Create line graph of frame rate over time in pulse tests
# for i, test in enumerate(pulse_tests):
#     # Only plot every 5th data point (adjust as needed)
#     plt.plot(test.data['Time (s)'][::5], test.data['Frame Rate (FPS)'][::5], label=test.name, color='gray', linestyle='-', marker='o')

# plt.xlabel("Time (s)")
# plt.ylabel("Frame Rate (FPS)")
# plt.legend()
# plt.savefig("pulse_frame_rate_over_time.png")
# plt.close()


# Create bar chart of average page load times per framework
for i, test in enumerate(all_tests):
    plt.bar(test.name, test.get_page_load_time() if test.get_page_load_time() is not None else 0, color='gray')

plt.xlabel("Framework", fontsize=font_size)
plt.ylabel("Page Load Time (s)", fontsize=font_size)
plt.savefig("page_load_times.png")
plt.close()

# # Create bar chart of average frame rate per framework
# for i, test in enumerate(all_tests):
#     plt.bar(test.name, test.get_average_frame_rate(), color='gray', hatch=all_test_patterns[i])

# plt.xlabel("Framework")
# plt.ylabel("Frame Rate (FPS)")
# plt.savefig("frame_rate_all_test_average.png")
# plt.close()

# # Create bar chart of average memory usage per framework
# for i, test in enumerate(all_tests):
#     plt.bar(test.name, test.get_average_memory_usage(), color='gray', hatch=all_test_patterns[i])

# plt.xlabel("Framework")
# plt.ylabel("Memory Usage (MB)")
# plt.savefig("memory_usage_all_test_average.png")
# plt.close()

# Create memory usage over time line graphs of bouncing ball tests
for test, pattern in zip(bouncing_ball_tests, bouncing_ball_patterns):
    plt.plot(test.data['Time (s)'], test.data['Memory Usage (MB)'], label=test.name, color='gray', linestyle='-', marker=pattern, markevery=10)

plt.xlabel("Time (s)", fontsize=font_size)
plt.ylabel("Memory Usage (MB)", fontsize=font_size)
plt.legend()
plt.savefig("bouncing_ball_memory_usage_over_time.png")
plt.close()

# Create memory usage over time line graphs of fading tests
for test, pattern in zip(fading_tests, fading_patterns):
    plt.plot(test.data['Time (s)'], test.data['Memory Usage (MB)'], label=test.name, color='gray', linestyle='-', marker=pattern, markevery=10)

plt.xlabel("Time (s)", fontsize=font_size)
plt.ylabel("Memory Usage (MB)", fontsize=font_size)
plt.legend()
plt.savefig("fading_memory_usage_over_time.png")
plt.close()

# Create memory usage over time line graphs of pulse tests
for test, pattern in zip(pulse_tests, pulse_patterns):
    plt.plot(test.data['Time (s)'], test.data['Memory Usage (MB)'], label=test.name, color='gray', linestyle='-', marker=pattern, markevery=10)

plt.xlabel("Time (s)", fontsize=font_size)
plt.ylabel("Memory Usage (MB)", fontsize=font_size)
plt.legend()
plt.savefig("pulse_memory_usage_over_time.png")
plt.close()
