import React from "react"
import NameEditor from "../widgets/NameEditor"
import IdViewer from "../widgets/IdViewer"
import PositionEditor from "../widgets/PositionEditor"
import LbSecTitle from "../components/Rightbar"



function NodeEditor() {
  return (
    <div>

        <div className="flex flex-col p-2 h-screen">
            <div id="NodeEditor_Header">
                <h2>
                    Node Editor
                </h2>
            </div>

            <div id="NodeEditor_Widgets">
                <NameEditor/>
                <IdViewer/>
                <PositionEditor/>
            </div>
        </div>
    </div>
  )
}

export default NodeEditor;
