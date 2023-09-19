import { NavLink, Outlet } from "react-router-dom";
import { FcHome, FcBusinessman, FcMoneyTransfer } from "react-icons/fc";
const AdminDashboadLayout = () => {
  return (
    <div className="drawer lg:drawer-open ">
      <div className=" -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
        <div
          className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-10 blur-lg filter"
          style={{
            background:
              "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
          }}
        ></div>
      </div>

      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content m-4 ">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        ></label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="w-64 bg-gradient-to-b h-screen text-black bg-gray-100 ">
          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 pt-5">
            <NavLink
              to="/admin-dashboard/manage-loans"
              className="hover:text-green-600 flex gap-2 items-center"
            >
              <FcMoneyTransfer
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
           Manage loans
            </NavLink>
          </li>



          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 pt-5">
            <NavLink
              to="/user-dashboard/profile"
              className="hover:text-green-600 flex gap-2 items-center"
            >
              <FcBusinessman
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              Profile
            </NavLink>
          </li>

          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 mt-2">
            <NavLink
              to="/"
              className="hover:text-green-600 flex gap-2 items-center"
            >
              <FcHome
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboadLayout;
