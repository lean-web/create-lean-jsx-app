import { SlowMessage, SlowWithLoading } from "@/components/slow";
import logo from "@/web/public/logo.svg";
import type { SXLGlobalContext } from "lean-jsx-types/context";

function isJSDisabled(globalContext: SXLGlobalContext | undefined) {
  return !!globalContext && globalContext.noJS;
}

export function App({ globalContext }: SXL.Props) {
  const noJS = isJSDisabled(globalContext);

  return (
    <main>
      <div className="logo">{logo}</div>
      <p>
        Lean-JSX is a server-driven library that allows developers to build web
        applications using JSX-like components without the typical JS payload.
      </p>
      <p>
        Stream HTML directly to the browser and leverage asynchronous
        server-side rendering for optimum performance.
      </p>
      <p>
        We can render slow content in async components{" "}
        {noJS ? `with JavaScript disabled` : ""}:
      </p>
      <ul className="slow-messages">
        <li className="slow-message slow-message--large">
          <h2>With no loading state</h2>
          <SlowMessage>This takes long to load...</SlowMessage>
        </li>
        <li className="slow-message slow-message--large">
          <h2>With loading state</h2>
          <SlowWithLoading>This was slow too!</SlowWithLoading>
        </li>
      </ul>
      <p>
        {noJS
          ? `Rendering slow content with JS disabled blocks on slow content, but it still works!`
          : `...without blocking the rendering of fast content (like this paragraph)!`}
      </p>
    </main>
  );
}
