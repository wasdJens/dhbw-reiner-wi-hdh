import DumbIntro from "~/components/dumb-intro/dumb-intro";
import type { Route } from "./+types/home";
import CssIntro from "~/components/css-intro/css-intro";
import Counter from "~/components/counter/counter";
import Playground from "~/components/playground/playground";
import Navigation from "~/components/navigation/navigation";

export default function Home() {
  return (
    <>
      <Navigation></Navigation>
      <DumbIntro></DumbIntro>
      <CssIntro></CssIntro>
      <Counter></Counter>
      <Playground></Playground>
    </>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Intro" },
    { name: "description", content: "Welcome to React!" },
  ];
}
