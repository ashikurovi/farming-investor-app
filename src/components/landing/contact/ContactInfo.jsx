import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";

export function ContactInfo() {
    return (
        <div className="space-y-12">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                        <Mail className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1">Email Us</h4>
                    <p className="text-sm text-zinc-500 mb-3">Our friendly team is here to help.</p>
                    <a href="mailto:hello@farming-investor.com" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">hello@farming-investor.com</a>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                        <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1">Call Us</h4>
                    <p className="text-sm text-zinc-500 mb-3">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+8801234567890" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">+880 1234 567 890</a>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1">Visit Us</h4>
                    <p className="text-sm text-zinc-500 mb-3">Come say hello at our office.</p>
                    <span className="text-sm font-semibold text-zinc-900">Level 4, AgriTech Tower,<br/>Dhaka 1212, Bangladesh</span>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1">Working Hours</h4>
                    <p className="text-sm text-zinc-500 mb-3">We are open on these times.</p>
                    <span className="text-sm font-semibold text-zinc-900">Mon-Fri: 9:00 AM - 6:00 PM<br/>Sat-Sun: Closed</span>
                </div>
            </div>

            {/* Map or Image Placeholder */}
            <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                    <div className="text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 mb-4">
                            <Globe className="h-6 w-6 text-zinc-400" />
                        </div>
                        <p className="text-sm font-medium text-zinc-500">Interactive Map Loading...</p>
                    </div>
                </div>
                {/* In a real app, you would embed a Google Map or similar here */}
            </div>
        </div>
    );
}