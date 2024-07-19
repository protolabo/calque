import { ReactNode, useContext, useState, FC } from "react";

// Icons
import { FiPlus } from "react-icons/fi";
import { MdLayers } from "react-icons/md";
import { IconType } from "react-icons";
import LineIcon from "./../assets/Line.asset";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";

import { AppContext } from './Layout';

interface LbSecTitleProps {
  children: ReactNode;
  toggle: () => void;
  isOpen: boolean;
}

const LbSecTitle: FC<LbSecTitleProps> = ({ children, toggle, isOpen }) => {
  const { mode } = useContext(AppContext);

  return (
    <div className="flex justify-between p-2 items-center font-bold">
      <div className="flex gap-1 items-center">
        <button  onClick={toggle}>{isOpen ? <GoTriangleDown className="w-4 h-4"/> : <GoTriangleRight className="w-4 h-4"/>}</button>
        <div>{children}</div>
      </div>
      {mode === 'edit' && <FiPlus className="w-5 h-5"/>}
    </div>
  );
};

interface LbSubSectionProps {
  icon: IconType;
  children: ReactNode;
}

const LbSubSection: FC<LbSubSectionProps> = ({ icon: Icon, children }) => {
  return (
    <div className="flex justify-start p-2 ml-6 gap-2 items-center">
      <Icon className="w-6 h-6"/>
      <div>{children}</div>
    </div>
  );
};

interface LbGroupElementsProps {
  title: string;
  icon: IconType;
  children: string[];
}

const LbGroupElements: FC<LbGroupElementsProps> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="first:border-b-2 border-slate-400 py-2">
      <LbSecTitle toggle={toggle} isOpen={isOpen}>{title}</LbSecTitle>
      {isOpen && children.map((child, index) => (
        <LbSubSection key={index} icon={icon}>{child}</LbSubSection>
      ))}
    </div>
  );
};

/**
 *   Je pense que pour preview des etages, des lignes et des tags, il est mieux de garder la leftbar.
 *   Ainsi je garderais aussi la rightbar pour l'esthetisme.
 *
 *   Preview etages: Cliquer sur un etage va preview un etage de la sous-carte
 *   Preview lignes: Cliquer sur une ligne va highlight cette ligne,
 *   et toutes les autres lignes vont devenir transparents
 *   Preview tags: Cliquer sur un tag va highlight tous les nodes possedant tag,
 *   et tous les autres nodes ainsi que les edges seront transparents.
 *
 *   - Camille
 */


const Leftbar: FC = () => {
  const sections = [
    { title: "Etages", icon: MdLayers, items: ["Rez-de-chaussée", "Sous-sol", "Métro"] },
    { title: "Lignes", icon: LineIcon, items: ["Ligne Orange", "Ligne Bleue"] },
    { title: "Tags", icon: BiSolidPurchaseTag, items: ["Station de train", "Université"] }
  ];

  return (
    <div className="sticky top-0 bg-secondary text-primary left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      {/*{mode === "editor" && sections.map((section, index) => (
        <LbGroupElements key={index} title={section.title} icon={section.icon} children={section.items} />
      ))}*/}
      {sections.map((section, index) => (
        <LbGroupElements key={index} title={section.title} icon={section.icon} children={section.items} />
        ))}
    </div>
  );
};

export default Leftbar;
