import { ScrambleText } from "./scramble-text"

type HeaderProps = {
  title: string;
  description: string;
}
export default function Header({title, description}: HeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="mb-6 text-4xl font-bold">
        <span className="mr-2 text-accent">{`>`}</span>
        <span className="inline-block">
          <ScrambleText text={title} />
        </span>
      </h1>
      <p className="animate-[fade-in-up_0.3s_ease-out_forwards]
         [@keyframes_fade-in-up:{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}] text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  );
}