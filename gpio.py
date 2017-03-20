import RPi.GPIO as GPIO
import sys

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(5,GPIO.OUT)

status = sys.argv[1];

print "Setting value of gpio...%s" % sys.argv[1] 
if status=='on':
	GPIO.output(5,True)
	print "Set to...%s" % sys.argv[1]
elif status=='off':
	GPIO.output(5,False)
	print "Set to...%s" % sys.argv[1] 

