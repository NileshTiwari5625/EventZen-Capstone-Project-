import BudgetTracker from "@/components/BudgetTracker";

const AdminBudget = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Budget Tracking</h1>
        <p className="text-muted-foreground text-sm">Monitor event expenses and payment status.</p>
      </div>

      <BudgetTracker />
    </div>
  );
};

export default AdminBudget;
