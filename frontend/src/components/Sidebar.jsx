const folders = ['Documents', 'Downloads', 'Music', 'Pictures'];

export default function Sidebar({ setPath }) {
  return (
    <div className="sidebar">
      <h3>Folders</h3>
      <ul>
        {folders.map((folder) => (
          <li key={folder} onClick={() => setPath(folder)}>
            📁 {folder}
          </li>
        ))}
      </ul>
    </div>
  );
}
