import Toaster from "./components/Toaster";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Departments from "./components/Departments";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";
import ManageProducts from "./components/ManageProducts";
import ManageRawMaterials from "./components/ManageRawMaterials";
import ManageCapitals from "./components/ManageCapitals";
import ManageExpenses from "./components/ManageExpense";
import GenerateReports from "./components/GenerateReports";
import ManagePayments from "./components/ManagePayments";
import Dashboard from "./components/Dashboard";
import ManageEmployeeRequests from "./components/ManageEmployeeRequest";
import ManageProductionRequests from "./components/ManageProductionRequest";
import ManageAttendance from "./components/ManageAttendance";
import ManageBackup from "./components/ManageBackup";
import Login from "./components/Login";
import ManageSalary from "./components/ManageSalary";
import ManageUsers from "./components/ManageUsers";
import ForgetPassword from "./components/ForgetPassword";
import Page404 from "./components/Page404";
import ManageAccount from "./components/ManageAccount";
import ManageEmployees from "./components/ManageEmployees";
import ManagePurchase from "./components/ManagePurchase";
import ManageSale from "./components/ManageSale";
import ManageProduction from "./components/ManageProduction";
import Product from "./components/Products";
import RawMaterial from "./components/RawMaterial";

function App() {
  const { loading } = useSelector((state) => state.ui);
  const temp = false;
  if (temp) {
    return (
      <div className="myLogin">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/forget_password" element={<ForgetPassword />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    );
  }
  if (!temp) {
    return (
      <div className="App">
        <Header />
        {loading && <Loading />}
        <div className="p-3">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/manage_departments" element={<Departments />} />
            <Route exact path="/manage_products" element={<ManageProducts />} />
            <Route exact path="/manage_capitals" element={<ManageCapitals />} />
            <Route
              exact
              path="/manage_raw_materials"
              element={<ManageRawMaterials />}
            />
            <Route exact path="/manage_expenses" element={<ManageExpenses />} />
            <Route
              exact
              path="/generate_reports"
              element={<GenerateReports />}
            />
            <Route exact path="/manage_payments" element={<ManagePayments />} />
            <Route
              exact
              path="/manage_employee_requests"
              element={<ManageEmployeeRequests />}
            />
            <Route
              exact
              path="/manage_production_requests"
              element={<ManageProductionRequests />}
            />
            <Route
              exact
              path="/manage_attendance"
              element={<ManageAttendance />}
            />
            <Route exact path="/manage_backup" element={<ManageBackup />} />
            <Route exact path="/manage_salary" element={<ManageSalary />} />
            <Route exact path="/manage_users" element={<ManageUsers />} />
            <Route exact path="/manage_accounts" element={<ManageAccount />} />
            <Route
              exact
              path="/manage_employees"
              element={<ManageEmployees />}
            />
            <Route
              exact
              path="/manage_purchases"
              element={<ManagePurchase />}
            />
            <Route exact path="/manage_sales" element={<ManageSale />} />
            <Route exact path="/products" element={<Product />} />
            <Route exact path="/inventory" element={<RawMaterial />} />
            <Route
              exact
              path="/manage_productions"
              element={<ManageProduction />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    );
  }
}

export default App;
