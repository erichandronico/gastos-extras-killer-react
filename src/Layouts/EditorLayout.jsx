

export const EditorLayout = ({ children, border = true }) => {
  return (
    <div className={`flex mt-2 mb-2 p-3 ${border ? 'border' : ''}`}>
      <div className="w-full p-4">
        {children}
      </div>
    </div>
  );
};
