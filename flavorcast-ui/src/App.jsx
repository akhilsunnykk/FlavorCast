import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:8080/api';

  const fetchIngredients = () => {
    axios.get(`${API_BASE}/ingredients`).then(res => setIngredients(res.data));
  };
  
  useEffect(() => { fetchIngredients(); }, []);

  const addIngredient = (e) => {
    e.preventDefault();
    if (!newIngredient) return;
    axios.post(`${API_BASE}/ingredients`, { name: newIngredient })
      .then(() => { 
        fetchIngredients(); 
        setNewIngredient(''); 
      });
  };

  const removeIngredient = (id) => {
    axios.delete(`${API_BASE}/ingredients/${id}`).then(() => fetchIngredients());
  };

  const getRecipe = () => {
    setLoading(true);
    setRecipe('');
    axios.get(`${API_BASE}/recipe`)
      .then(res => setRecipe(res.data.recipe))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1>FlavorCast 🍳</h1>
      <p>Add what's in your pantry, and let AI do the cooking.</p>
      
      <form onSubmit={addIngredient} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={newIngredient} 
          onChange={e => setNewIngredient(e.target.value)} 
          placeholder="e.g., Seer Fish, Coconut Milk, Penne Pasta..." 
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Add</button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
        {ingredients.map(ing => (
          <div key={ing.id} style={{ background: '#eee', padding: '8px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {ing.name}
            <button onClick={() => removeIngredient(ing.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'red' }}>✕</button>
          </div>
        ))}
      </div>

      <button onClick={getRecipe} disabled={loading} style={{ padding: '15px 30px', fontSize: '16px', cursor: 'pointer', width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        {loading ? 'Cooking up a recipe...' : 'Generate AI Recipe'}
      </button>

      {recipe && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '8px', lineHeight: '1.6' }}>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{recipe}</pre>
        </div>
      )}
    </div>
  );
}

export default App;