export default function FileItem({ item, setPath }) {
  const getIcon = () => {
    if (item.is_dir) return '/icons/folder.png';

    const ext = item.name.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) {
      return `http://192.168.31.191:5000/api/${item.path}`; // use actual image for preview
    }

    const iconMap = {
      pdf: '/icons/pdf.png',
      docx: '/icons/docx.png',
      mp3: '/icons/mp3.png',
      txt: '/icons/txt.png',
      zip: '/icons/zip.png',
      // add more extensions as needed
    };

    return iconMap[ext] || '/icons/default.png';
  };

  const open = () => {
    if (item.is_dir) {
      setPath(item.path);
    } else {
      window.open(`http://192.168.31.191:5000/api/${item.path}`, '_blank');
    }
  };

  return (
    <div className="file-item" onClick={open}>
      <img className="file-icon" src={getIcon()} alt="" />
      <div className="file-name">{item.name}</div>
    </div>
  );
}
