import styles from "./styles.css";

export function setHTML(title: string) {
  const html = document.querySelector("html") as HTMLElement;
  html.innerHTML = `<head>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
      <title>${title}</title>
      <style>
     ${styles}
      </style>
    </head>
    <body>
      <div id="message"></div>
      <div id="info"></div>
      <div id="wrapper"></div>
      <div id="progress"></div>
    </body>`;
}
