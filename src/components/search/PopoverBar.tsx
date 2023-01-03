import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import { useRef } from "react";
import SearchBar from "./SearchBar";

const PopoverBar = () => {
  //make a const with use ref for the form, no comment
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <form ref={formRef}>
            <div className="relative">
              <input
                placeholder="Busca algo..."
                className="w-full rounded-md h-10 p-4"
                type="text"
              />
              <MagnifyingGlassIcon className="absolute top-2.5 right-2 w-5 h-5" />
            </div>
          </form>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="w-2/3"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
            sideOffset={5}
          >
            <div className="bg-white focus:ring-4 focus:ring-blue-300 text-black p-5 rounded-tl-md rounded-tr-md shadow-lg">
              <div className="flex justify-between">
                <p>Búsquedas populares</p>
                <Popover.Close aria-label="Close">
                  <Cross2Icon />
                </Popover.Close>
              </div>
              <ul className="py-4">
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Casa
                </li>
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Montañas
                </li>
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Cielo
                </li>
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Felicidad
                </li>
              </ul>
            </div>
            <div className="bg-white focus:ring-4 focus:ring-blue-300 text-black p-5 rounded-bl-md rounded-br-md shadow-lg">
              <p>Temas populares</p>
              <ul className="py-4">
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Humano
                </li>
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Naturaleza
                </li>
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Actualidad
                </li>
                <li className="cursor-pointer inline mr-2 p-2 rounded-sm text-white bg-slate-800 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300">
                  Tecnología
                </li>
              </ul>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default PopoverBar;
