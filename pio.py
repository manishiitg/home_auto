
try:
	import RPi.GPIO as GPIO
	import sys
	import time
except RuntimeError:
	print("failed to load")

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(26,GPIO.OUT)

mode = GPIO.getmode()
print "GPIO MODE ..%s" % mode
status = sys.argv[1];
while True:
	print "Setting value of gpio...%s" % sys.argv[1] 
	time.sleep(5)
	GPIO.output(26,True)
	print "Set to...on"
	time.sleep(5)
	GPIO.output(26,False)
	print "Set to...off" 
		
		
