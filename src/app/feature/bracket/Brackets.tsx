import {
  Bracket,
  IRoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  IRenderSeedProps,
} from "react-brackets";
import React from "react";
import {
  BracketsContext,
  BracketsProvider,
} from "@/app/context/BracketsContext";



const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: IRenderSeedProps) => {
  // ------ assuming rounds is the losers brackets rounds ------
  // losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)

  const isLineConnector =
    rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  export const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Bracket
      rounds={rounds}
      roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
        return <div style={{ textAlign: "center", color: "red" }}>{title}</div>;
      }}
    />
  );
};

export default function Brackets() {
  //....
  return (
    <BracketsProvider>
      <Bracket rounds={rounds} />
    </BracketsProvider>
  );
};
