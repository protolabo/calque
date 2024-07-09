function Toolbarbackup(){
    return(
            {/*<div id="ToolBar" className="flex items-center">
        <Logo/>
      {/*Template:

        <ToolIcon 
        toolName="ToolNameForPrint" 
        Command={ToolCommandClass} 
        ReactIcon={ReactIcon} 
        />
      
      */}


        {/*Panning the canvas button*/}
        <ToolIcon 
        toolName="Pan" 
        Command={PanCommand} 
        ReactIcon={FaHandPaper} 
        />

        {/*Create an Edge on the Canvas button*/}
        <ToolIcon 
        toolName="CreateEdge" 
        Command={CreateEdgeCommand} 
        ReactIcon={Edge} 
        />
        {/*Create a Node on the Canvas button*/}
        <ToolIcon 
        toolName="CreateNode" 
        Command={CreateNodeCommand} 
        ReactIcon={VscCircleLargeFilled} 
        />
        {/*Select Canvas Element button*/}
        <ToolIcon 
        toolName="Select" 
        Command={SelectCommand} 
        ReactIcon={RiCursorFill} 
        />
        
    </div>
    )
}