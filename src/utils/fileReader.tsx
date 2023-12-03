export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      resolve(content ? content.toString() : '');
    };
    reader.onerror = () => reject(reader.error);

    reader.readAsText(file); 
  });
};