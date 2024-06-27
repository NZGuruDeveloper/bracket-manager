"use client";

/**
  TODO:
  Create a competition manager that allows the user the following:
  1. Select the type of bracket (single, double, round robin)
  2. add competitors
  3. add matches
  4. change colours
  5. Mobile friendly
  6. Link to the bjj-scoreboard app

  Breakdown:
  Create a Bracket component that takes in an array of rounds and renders them as a bracket. Each round should have an id, title, and an array of seeds. Each seed should have an id, date, and an array of teams.
  
*/
import Image from "next/image";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

import { BracketsProvider } from "./context/BracketsContext";

import { Bracket, IRoundProps } from "react-brackets";
// React Forms Hook
import { useForm, SubmitHandler } from "react-hook-form";
// Yup for validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Brackets from "./feature/bracket/Brackets";


// TODO:
// Settings: form to take in:
// - type of bracket
// - number of rounds
// - number of competitors
// - number of matches
type SettingsDialogProps = {
  isSettingDilagogOpen: boolean;
  setIsSettingDilagogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function SettingsDialog({
  isSettingDilagogOpen,
  setIsSettingDilagogOpen,
}: SettingsDialogProps) {
  enum BracketTypes {
    singleElimination = "Single Elimination",
    doubleElimination = "Double Elimination",
    roundRobin = "Round Robin",
  }

  interface IFormInput {
    numberOfCompetitors: number;
    bracketTypes: BracketTypes;
  }

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setIsSettingDilagogOpen(!isSettingDilagogOpen);
  };
  useEffect(() => {
    setIsOpen(isSettingDilagogOpen);
  }, [isSettingDilagogOpen]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div>
      {isOpen && (
           <div
           aria-hidden="true"
           className="ml-[-12px] lg:ml-0 overflow-y-auto overflow-x-auto fixed flex justify-center items-center inset-0 z-[100] bg-black bg-opacity-50 outline-none focus:outline"
         >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-gray-700">
          <div>
            <h1 className="text-xl text-2xl font-bold">Settings</h1>
            <p>
              To generate a competition bracket, please enter the following:
            </p>
          </div>
          <div className="w-full max-w-xs">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="numberOfCompetitors"
              >
                Number of Competitors
              </label>
              <input
                {...register("numberOfCompetitors", {
                  required: { value: true, message: "This field is required" },
                  maxLength: {
                    value: 20,
                    message: "Must be less than 20 competitors",
                  },
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 competitors",
                  },
                })}
                defaultValue={6}
                aria-invalid={errors.numberOfCompetitors ? "true" : "false"}
                type="number"
                placeholder="Number of competitors"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <div className="inline-block relative w-64">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bracketTypes"
                >
                  Bracket Type
                </label>
                <select
                  {...register("bracketTypes", {
                    required: {
                      value: true,
                      message: "Please select the bracket type",
                    },
                  })}
                  defaultValue={"doubleElimination"}
                  aria-invalid={errors.bracketTypes ? "true" : "false"}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="singleElimination">Single Elimination</option>
                  <option value="doubleElimination">Double Elimination</option>
                  <option value="roundRobin">Round Robin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default function Home() {
  const [isSettingDilagogOpen, setIsSettingDilagogOpen] = useState(false);

  const handleSettingsOpen = () => {
    setIsSettingDilagogOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-[#8CE5BA]">
          <button className="" onClick={handleSettingsOpen}>
            <FontAwesomeIcon className="" icon={faSliders} /> Settings
          </button>
          <SettingsDialog
            isSettingDilagogOpen={isSettingDilagogOpen}
            setIsSettingDilagogOpen={setIsSettingDilagogOpen}
          />
          {/* Settings TODO: control timer, with default 5min control players background
      color future: add upload logo and display logo */}
        </div>
        <Brackets />
      </div>
    </main>
  );
}
/* const Brackets = () => {
  return <Bracket rounds={rounds} />;
}; */