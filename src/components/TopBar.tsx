import { Form, NavLink } from "react-router-dom";

export const TopBar = () => {
  //   const navigate = useNavigate();
  return (
    <div className="hidden md:flex justify-between items-center bg-brand-cardBackground border-b border-brand-border h-full">
      <button className="bg-brand-primary">
        <NavLink to="/">Home</NavLink>
      </button>
      <Form method="post" action="/logout">
        <button type="submit" className="bg-brand-secondary">
          Logout
        </button>
      </Form>
    </div>
  );
};
