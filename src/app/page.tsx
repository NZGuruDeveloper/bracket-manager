"use client";


/**
  TODO:
  Create a competition manager that allows the user the following:
  1. Select the type of bracket (single, double, round robin)
  2. add competitors
  3. add matches
  4. change colours
  5. Mobile friendly

  Breakdown:
  Create a Bracket component that takes in an array of rounds and renders them as a bracket. Each round should have an id, title, and an array of seeds. Each seed should have an id, date, and an array of teams.
  
*/
import Image from "next/image";


import { Bracket, IRoundProps } from 'react-brackets';

const rounds: IRoundProps[] = [
  {
    title: 'Round one',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Competitor A' }, { name: 'Competitor B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Competitor C' }, { name: 'Competitor D' }],
      },
    ],
  },
  {
    title: 'Round one',
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Competitor A' }, { name: 'Competitor C' }],
      },
    ],
  },
];

const Brackets = () => {
  return <Bracket rounds={rounds} />;
};
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
 
        <Brackets />
      </div>
    </main>
  );
}
