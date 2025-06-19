export default function Breadcrumb({ path, setPath }) {
  const parts = path.split('/').filter(Boolean);

  const navigateTo = (index) => {
    const newPath = parts.slice(0, index + 1).join('/');
    setPath(newPath);
  };

  return (
    <div className="breadcrumb">
      <span className="breadcrumb-link" onClick={() => setPath('')}>This PC</span>
      {parts.map((p, i) => (
        <span key={i}>
          {' > '}
          <span className="breadcrumb-link" onClick={() => navigateTo(i)}>{p}</span>
        </span>
      ))}
    </div>
  );
}
