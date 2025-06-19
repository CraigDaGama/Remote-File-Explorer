import { useEffect, useState } from 'react';
import axios from '../api';
import FileItem from './FileItem';
import Loader from './Loader';

export default function FileList({ path, setPath }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/${path}`);
        console.log('Data received:', res.data);
        setItems(res.data.items);
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // ⬅ call the async function inside useEffect
  }, [path]); // ⬅ run when path changes

  return (
    <div className="file-list">
      {loading ? (
        <Loader />
      ) : (
        items.map(item => (
          <FileItem key={item.name} item={item} setPath={setPath} />
        ))
      )}
    </div>
  );
}
