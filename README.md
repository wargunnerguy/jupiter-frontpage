1. Kodutöö osa (avaleht) https://wargunnerguy.github.io/jupiter-frontpage
2. Kodutöö osa (otsing): https://wargunnerguy.github.io/jupiter-frontpage/search

### Tehtud (Tööle kulunud aeg 2.5h)

- ✅ **Uus leht/vaade otsingu jaoks**
  - Loodud `/search` route.
  - Loodud täielik otsinguvorm koos väljadega:
    - Otsingufraas (`phrase`)
    - Otsingu tüüp (`type`: all, photo, video, audio)
    - Sorteerimisvalik (`sortOption`: accuracy, new, old, abc)
    - Ajavahemik (`timeRange`: all, week, month, year)
    - Tulemite arv lehel (`limit`)
  - Vorm kinnitab otsingu kas nupuvajutuse või Enter-klahviga.

- ✅ **Andmete pärimine API kaudu**
  - Loodud `SearchService`, mis teeb POST-päringu aadressile `/api/v1/search`.
  - Päringu bodys saadetakse ainult vajalikud `queryParams` väljad.
  - Tulemus töödeldakse, et lisada vajadusel pildi URL.

- ✅ **Tulemuste töötlemine ja kuvamine**
  - Vastused grupeeritakse meediatüübi kaupa (`activeList.data`).
  - Kuvatakse iga grupi tulemused kaardivaates (`card` komponendid Bootstrapiga).
  - Lisatud lehekülje navigeerimise nupud (`Eelmine` / `Järgmine`).

- ✅ **Piltide kuvamine ja töötlus**
  - Loodud `buildCropUrl` utiliit, mis ehitab ERR image cropper teenuse URL-i.
  - Pildi kuvamine töötab, kui API tagastab kehtiva failitee.
  - Pilte laaditakse optimeeritult `NgOptimizedImage` abil (mõõtmete ja `priority` atribuudiga).

---

### Lõpetamata / osaliselt valmis

- ❌ **Piltide kuvamine tulemuste puhul**

- ❌ **Error handling ja tühjade olekute käsitlus**
  - Hetkel puudub detailsem kasutajale suunatud teavitus olukorras, kus API ei tagasta tulemusi või tekib võrgutõrge.
  - Puudub “No results” eridisain.

- ❌ **Täiendavad QueryParams väljad**
  - `timeRangeFrom`, `timeRangeTo`, `includeTranscription` ja `advancedParams` on jäetud staatilisteks või kasutamata, kuna neid ei peetud esmaseks prioriteediks.

- ❌ **Visuaalne viimistlus**
  - Otsingutulemuste kaardid on lihtsas Bootstrap stiilis, disaini pole detailselt kohandatud.
  - Responsive disain töötab üldjoontes, aga ei ole igal ekraanil testitud.


# JupiterFrontpage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
