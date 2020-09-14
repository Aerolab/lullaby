import { Link } from "../../i18n";

export default function Button({ href, children }) {
  return (
    <Link href={href}>
      <a className="Button">
        {children}

        <style jsx>{`
          .Button {
            display: inline-block;
            box-sizing: border-box;
            font-size: 1.1em;
            line-height: 1;
            padding: 1.6em 2.5em;
            border-radius: 4em;
            text-decoration: none;
            font-weight: bold;
            border: none;
            text-transform: uppercase;
            color: var(--primary);
            background: none;
            border: 3px solid var(--primary);
            transition: all 0.15s ease-out;
            cursor: pointer;
          }
          .Button:hover {
            color: white;
            background: var(--primary);
          }
        `}</style>
      </a>
    </Link>
  );
}
