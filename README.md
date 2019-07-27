
# Wykonanie zadania - Michał Sałek
[https://www.linkedin.com/in/michal-salek/](https://www.linkedin.com/in/michal-salek/)
### Możliwości ogólne:
Usuwanie rekordów odbywa się na jednym źródle prawdy, dzięki temu użytkownik tracący dostęp do internetu nie skasuje rekordu tylko z widoku (a po odświeżeniu rekord wróci).
Listy posiadają osobne loadery.
Aplikacja posiada loader główny odpalany podczas wykonywania zapytań.
Przy interakcji użytkownika pojawiają się za każdym razem stosowne infoboxy w lewym, dolnym rogu.
Aplikacja w całości jest dostępna z poziomu klawiatury.

  
##### Dodanie książki:
- Nie ma potrzeby przechodzenia do nowego widoku
- Walidacja uzupełnienia pól (wyłączenie buttona, gdy któreś jest puste)
- Walidacja numeru ISBN na froncie, dzięki czemu wiadomo w czasie rzeczywistym, czy numer jest poprawny. Gdyby ktoś włączył przycisk devtoolsami - wtedy nie puści go backend :-)
- Czyszczenie pól po wysyłce i aktualizacja listy
##### Lista książek:
- Pływająca belka tytułowa tabeli
- Najnowsze wpisy pojawiają się na samej górze
- Paginacja działająca na zasadzie odpytywania o kolejne strony, gdy liczba rekordów przekroczy liczbę 30
- Numerki przy buttonach oznaczające ilość recenzji, które posiada dana książka
- Podświetlanie rekordów podczas wskazywania na nie
- Automatyczne odświeżanie listy co 30 sekund (w oczekiwaniu na niesamowitą premierę)
##### Przycisk Scroll To Top (bez jQuery :-))
##### Edycja książki:
- Takie same walidacje, jak w przypadku dodawania
- Data wybierana pickerem, ale przesyłana nadal w formacie ISO (funkcja z opcjami twardo wytypowanymi w TS)
- Sprawdzanie "sum kontrolnych" i nie pozwolenie na podmianę niezmienionych rekordów
- Gdy pola będą zmienione, a ISBN nieprawidłowy - wciąż nie można zaktualizować książki
##### Recenzje:
- Dodawanie odbywa się w taki sam sposób, jak dodawanie książki
- Możliwość oceniania w skali gwiazdkowej
- Tu również nie można wysłać pustej recenzji
- Paginacja odbywa się tym razem na froncie po pobraniu wszystkich recenzji
- Można wybrać ilość wyświetlanych wierszy (5, 10, 20)


Aplikacji przydałby się refactoring codu, RWD również. Póki co - troszkę zostało zrobione i liczę na ruch z feedbackiem :-).

Michał Sałek 

m.salekk@gmail.com 

+48 532 345 304 
