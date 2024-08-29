import { FaRegSave } from "react-icons/fa";

const SaveButton = () => {
  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const saveToDatabase = () => {

  const map = document.getElementById("canvas")?.cloneNode(true) as SVGSVGElement;
  const serializer = new XMLSerializer();
  const content = serializer.serializeToString(map);
  const titleVariable = generateRandomString(15)
  //
  const body = {
    "title":`${titleVariable}`,
    "description":"this is a description",
    "content": content,
    "creator" : "unknown user"
  }
  console.log(map)
  // Send the POST request using fetch
  fetch(`http://localhost:3000/api/project/`, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON de la repoonse
  })
  .then(data => {
      console.log('Recette ajoutee:', data); // Handle donnée de réponse
  })
  .catch(error => {
      console.error('Erreur lors de la creation de la recette:', error); // Handle any errors
      //
      //
        // If post fails, try PUT
        fetch(`http://localhost:3000/api/project/${titleVariable}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON de la repoonse
        })
        .then(data => {
            console.log('Recette ajoutee:', data); // Handle donnée de réponse
        })
        .catch(error => {
            console.error('Erreur lors de la creation de la recette:', error); // Handle any errors
        })
      }
      
    );
  }


  return (
    <button className='flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg hover:bg-blue-600' onClick={saveToDatabase}>
      Save
      <FaRegSave className='w-6 h-6'/>
    </button>
  )
}

export default SaveButton