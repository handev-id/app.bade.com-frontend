<h1 align="center">
PWA Vite React Boilerplate
</h1>

<div flex align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/menglinmaker/PWA-Vite-React-Boilerplate?style=flat-square">
<img src="https://img.shields.io/github/languages/code-size/menglinmaker/PWA-Vite-React-Boilerplate?style=flat-square">
<img src="https://img.shields.io/github/workflow/status/menglinmaker/PWA-Vite-React-Boilerplate/Continuous Integration?style=flat-square">
<img src="https://img.shields.io/website?down_color=red&down_message=offline&up_color=success&up_message=online&url=https://menglinmaker-midi-virtual-piano.netlify.app/&style=flat-square">
<img src="https://img.shields.io/github/forks/menglinmaker/PWA-Vite-React-Boilerplate?label=forks&style=flat-square">
</div>

<div>&nbsp</div>
<div align='center'>
<a href='https://pwa-vite-react-boilerplate.netlify.app/'>
<img width='480' src='https://user-images.githubusercontent.com/39476147/184496091-35faa26b-4591-45bc-90cb-6a215f600e2d.png'/>
</a>
</div>
<div>&nbsp</div>

<div flex align='center'>
<img height=30 src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
<img height=30 src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img height=30 src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
<img height=30 src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
</div>

<h2 align='center'> ->> <a href='https://pwa-vite-react-boilerplate.netlify.app/'> Demo Page </a> <<- </h2>

<div>&nbsp</div><div>&nbsp</div><div>&nbsp</div>

# Boilerplate Techstack

This boilerplate is already preinstalled with:

- _[Vite Plugin PWA](https://vite-plugin-pwa.netlify.app/)_ to generate the manifest JSON for _[progressive web app (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)_.
- _[Vite.js](https://vitejs.dev/)_ frontend tooling to build for production.
- _[React.js](https://reactjs.org/)_ with TypeScript support.
- _[Sass](https://sass-lang.com/)_ CSS preprocessor. To uninstall, type: `npm uninstall sass` in terminal.
- _[Github Action](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)_ for continuous integration and codeql analysis.

<div>&nbsp</div><div>&nbsp</div><div>&nbsp</div>

# How To Use

## Generate GitHub repository

1. Generate your repository from this template: _[Click Here](https://github.com/MengLinMaker/PWA-Vite-React-Boilerplate/generate)_
2. Clone code to your to remote repository: `git clone https://github.com/user-name/repository-name`

Note: supply your GitHub user-name and repository-name.

## Development

The following terminal commands are from _[Vite.js command line interface](https://vitejs.dev/guide/#command-line-interface)_. Also check the _[package.json](https://github.com/MengLinMaker/PWA-Vite-React-Boilerplate/blob/main/package.json)_ file "scripts" section for all command line scripts.

Note: _[npm](https://www.npmjs.com/)_ can also be replaced with _[yarn](https://yarnpkg.com/)_ or _[pnpm](https://pnpm.io/)_...

### Run development website locally

```
npm run dev
```

- There is no PWA functionality in development mode.

### Build production files - to "dist" folder

```
npm run build
```

- Ensure there are no TypeScript errors, otherwise complilation will be aborted.
- Build files will be placed in the "dist" folder by default.
- To change build folder, add this line to _[vite.config.ts](https://github.com/MengLinMaker/PWA-Vite-React-Boilerplate/blob/main/vite.config.ts)_ `defineConfig`:

```javascript
build: {
  outDir: './build-directory'
},
```

### Run production build website locally

```
npm run preview
```

BIKIN HALAMAN PENGUMUMAN KELULUSAN UJIAN, SEPERTI AMPLOP DIBUKA ADA LULUS ATAU TIDAK KALAU LULUS BAYAR PEMBAYARAN DAFTAR ULAGN, KLO TIDAK BALIK LAGI KE HALAMAN PEMBAYARAN DAN STATUS PEMBAYARAN JADI BERUBAH NOT PAID LAGI
