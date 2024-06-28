import { Component, ReactNode } from "react";

// Icons
import { FiPlus } from "react-icons/fi";
import { MdLayers } from "react-icons/md";
import { RxDividerHorizontal } from "react-icons/rx";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { VscCircleLargeFilled } from "react-icons/vsc";
import Line from "./Line";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleRight } from "react-icons/go";

function LbSecTitle(props: {children: ReactNode}) {
  return (
    <div className="flex justify-between p-2 items-center font-bold">
      <div className="flex gap-1 items-center">
        <GoTriangleDown className="w-4 h-4"/>
        <div>{props.children}</div>
      </div>
      <FiPlus className="w-5 h-5"/>
    </div>
  )
}

function LbSubSection(props: {icon: React.FC<{className: string}>, children: ReactNode}) {
    return (
      <div className="flex justify-start p-2 gap-2 items-center">
        <props.icon className="w-6 h-6"/>
        <div>{props.children}</div>
    </div>
    )

}

/*[&:not(:last-child)]:border-b-2 border-slate-400 pb-4 */

function LbGroupElements(props: {children: ReactNode}) {
  return (
    <div className="first:border-b-2 border-slate-400 pb-4">
      {props.children}
    </div>
  )
}
function FloorSection(props: {children: ReactNode}) {
  return (
    <LbSubSection icon={MdLayers}>
      {props.children} 
    </LbSubSection>
  )
}

function LineSection(props: {children: ReactNode}) {
  return (
    <LbSubSection icon={Line}>
      {props.children}
    </LbSubSection>
  )

}

function TagSection(props: {children: ReactNode}) {
  return (
    <LbSubSection icon={BiSolidPurchaseTag}>
      {props.children}
    </LbSubSection>
  )
}

function Leftbar() {
  return (
    <div className="fixed bg-secondary text-primary left-0  z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <LbGroupElements>
        <LbSecTitle>
          Etages
        </LbSecTitle>
        <FloorSection>
          Rez-de-chaussée
        </FloorSection>
      </LbGroupElements>
      <LbGroupElements>
        <LbSecTitle>
            Lignes
        </LbSecTitle>
        <LineSection>
            Ligne Orange
        </LineSection>
      </LbGroupElements>
      <LbGroupElements>
        <LbSecTitle>
            Tags
        </LbSecTitle>
        <TagSection>Station de train</TagSection>
        <TagSection>Université</TagSection>
      </LbGroupElements>
    </div>
  )
}

export default Leftbar
