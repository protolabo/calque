export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state:any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      // Ignore write errors
    }
  };

  export const resetState = () => {
    try {
      localStorage.clear();
    } catch (err) {
      // Ignore errors
      console.log("Local Storage has not been reset")
    }
  };
  