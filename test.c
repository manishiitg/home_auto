#include <stdio.h>
#include <wiringPi.h>

// LED Pin - wiringPi pin 0 is BCM_GPIO 17.

#define LED     0

int main (void)
{
  printf ("Raspberry Pi - Gertboard Blink\n") ;

  wiringPiSetup () ;

  pinMode (LED, OUTPUT) ;

  for (;;)
  {
    printf(".......high....\n");
    digitalWrite (LED, HIGH) ;     // On
    delay (5000) ;               // mS
    printf("..low........\n");
    digitalWrite (LED, LOW) ;     // Off
    delay (5000) ;
  }
  return 0 ;
}
