import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (login(email, password)) {
            navigate("/admin");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
            <SkeuCard className="w-full max-w-md p-8 sm:p-12 text-center border-t-4 border-primary" hover={false}>
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock size={32} />
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-2">Admin Panel</h2>
                <p className="text-slate-500 mb-8">Sign in to manage website content.</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="text-left">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-cream-dark/30 rounded-xl border border-transparent focus:border-primary/50 focus:bg-white focus:outline-none transition-colors shadow-inner"
                            placeholder="admin@trustngo.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-cream-dark/30 rounded-xl border border-transparent focus:border-primary/50 focus:bg-white focus:outline-none transition-colors shadow-inner"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="pt-4">
                        <SkeuButton type="submit" variant="primary" className="w-full py-4 text-lg">
                            Login to Dashboard
                        </SkeuButton>
                    </div>
                </form>

                <div className="mt-8 text-sm text-slate-500">
                    <p>Demo Credentials:</p>
                    <p>Email: admin@trustngo.org</p>
                    <p>Password: admin123</p>
                </div>
            </SkeuCard>
        </div>
    );
}
