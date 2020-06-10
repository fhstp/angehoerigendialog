# Strange Problems

These problems won't be fixed, as the only occure on one device or are not really reproducable.

## Watering Can Color

This bug is reproducable in the current Version (83.0.4103.97) of Google Chrome on desktop:
1. Fill out section six in the questionare, so you can see the watering can on the visualisation-handout

2. Press the **Handout als PDF speichern**-Button

3. Print the visualisation-handout directly with a printer (don't select the option to print a PDF-File in the Browser-print dialogue -> instead select a printer and print it)

4. See the problem: the water-wave (CSS-Background-image) in the watering can has a slightly different color than the blue background-items in the watering can.

### Findings

- This problem seems to appear not on all printers (but it appears for example on "Dell Color MFP H625cdw").

- A solution could be that the [wave](src/assets/icons/welle.svg) is not implemented as [background-image](src/components/visualisations/AnFlower.vue#L304) but instead and directly embedded as an svg.

> Watch out: this bug does not appear when the handout is exported as a PDF-File and then printed afterwards, it only happens when printing directly.
