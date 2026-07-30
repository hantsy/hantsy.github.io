/// <reference types="vite/client" />
/// <reference types="@analogjs/platform" />

declare module '*.md' {
  const content: string;
  export default content;
}
