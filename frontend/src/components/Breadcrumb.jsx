import { Link } from 'react-router-dom';


export default function Breadcrumb({ items }) {
  return (
    <div className="flex items-center gap-2 text-[14px] text-black">
      <Link to="/" className="hover:text-[#C9960C] transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-black">›</span>
          {item.to ? (
            <Link to={item.to} className="hover:text-[#C9960C] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[#C9960C] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
