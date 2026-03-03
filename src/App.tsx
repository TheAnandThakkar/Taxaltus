import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Form16Explorer from "./pages/Form16Explorer";
import Form16Detail from "./pages/Form16Detail";
import Specimen from "./pages/Specimen";
import Deductions from "./pages/Deductions";
import SectionDetail from "./pages/SectionDetail";
import HeadsOfIncome from "./pages/HeadsOfIncome";
import HeadDetail from "./pages/HeadDetail";
import Glossary from "./pages/Glossary";
import GlossaryDetail from "./pages/GlossaryDetail";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Estimator from "./pages/Estimator";
import ItrSelector from "./pages/ItrSelector";
import RegimeComparison from "./pages/RegimeComparison";
import Checklist from "./pages/Checklist";
import InvestmentDeadlines from "./pages/InvestmentDeadlines";
import BudgetChanges from "./pages/BudgetChanges";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/form16" element={<Form16Explorer />} />
        <Route path="/form16/:id" element={<Form16Detail />} />
        <Route path="/form16/specimen" element={<Specimen />} />
        <Route path="/deductions" element={<Deductions />} />
        <Route path="/deductions/:id" element={<SectionDetail />} />
        <Route path="/heads" element={<HeadsOfIncome />} />
        <Route path="/heads/:id" element={<HeadDetail />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/glossary/:id" element={<GlossaryDetail />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/estimator" element={<Estimator />} />
        <Route path="/itr-selector" element={<ItrSelector />} />
        <Route path="/regime" element={<RegimeComparison />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/investment-deadlines" element={<InvestmentDeadlines />} />
        <Route path="/budget-changes" element={<BudgetChanges />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
