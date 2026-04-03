import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";

export function ContactInfo() {
    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h3 className="text-3xl font-bold text-zinc-900 tracking-tight mb-3">
                    Contact Information
                </h3>
                <p className="text-zinc-500 text-base leading-relaxed">
                    Have questions? Our team is here to help you navigate your sustainable investing journey.
                </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-6">
                <div className="group p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-100 shadow-xl shadow-zinc-200/20 hover:shadow-2xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.35)] hover:border-[color:rgba(77,140,30,0.18)] transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[color:rgba(124,194,46,0.14)] rounded-full blur-2xl -z-10 transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[color:rgba(77,140,30,0.10)] rounded-full -z-10 transition-transform duration-700 group-hover:scale-125 opacity-50" />

                    <div className="h-14 w-14 bg-[linear-gradient(135deg,rgba(124,194,46,0.18),rgba(77,140,30,0.12))] rounded-2xl flex items-center justify-center mb-6 text-primary ring-1 ring-[color:rgba(77,140,30,0.18)] shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1.5 text-lg group-hover:text-primary transition-colors">Email Us</h4>
                    <p className="text-sm text-zinc-500 mb-5">Our friendly team is here to help.</p>
                    <a href="mailto:hello@farming-investor.com" className="inline-flex text-sm font-semibold text-primary hover:text-[color:var(--brand-to)] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[color:var(--brand-to)] after:transition-all hover:after:w-full">hello@farming-investor.com</a>
                </div>

                <div className="group p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-100 shadow-xl shadow-zinc-200/20 hover:shadow-2xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.35)] hover:border-[color:rgba(77,140,30,0.18)] transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[color:rgba(124,194,46,0.14)] rounded-full blur-2xl -z-10 transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[color:rgba(77,140,30,0.10)] rounded-full -z-10 transition-transform duration-700 group-hover:scale-125 opacity-50" />

                    <div className="h-14 w-14 bg-[linear-gradient(135deg,rgba(124,194,46,0.18),rgba(77,140,30,0.12))] rounded-2xl flex items-center justify-center mb-6 text-primary ring-1 ring-[color:rgba(77,140,30,0.18)] shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Phone className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1.5 text-lg group-hover:text-primary transition-colors">Call Us</h4>
                    <p className="text-sm text-zinc-500 mb-5">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+8801234567890" className="inline-flex text-sm font-semibold text-primary hover:text-[color:var(--brand-to)] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[color:var(--brand-to)] after:transition-all hover:after:w-full">+880 1234 567 890</a>
                </div>

                <div className="group p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-100 shadow-xl shadow-zinc-200/20 hover:shadow-2xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.35)] hover:border-[color:rgba(77,140,30,0.18)] transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[color:rgba(124,194,46,0.14)] rounded-full blur-2xl -z-10 transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[color:rgba(77,140,30,0.10)] rounded-full -z-10 transition-transform duration-700 group-hover:scale-125 opacity-50" />

                    <div className="h-14 w-14 bg-[linear-gradient(135deg,rgba(124,194,46,0.18),rgba(77,140,30,0.12))] rounded-2xl flex items-center justify-center mb-6 text-primary ring-1 ring-[color:rgba(77,140,30,0.18)] shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1.5 text-lg group-hover:text-primary transition-colors">Visit Us</h4>
                    <p className="text-sm text-zinc-500 mb-5">Come say hello at our office.</p>
                    <span className="text-sm font-medium text-zinc-800 leading-relaxed">Level 4, AgriTech Tower,<br />Dhaka 1212, Bangladesh</span>
                </div>

                <div className="group p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-100 shadow-xl shadow-zinc-200/20 hover:shadow-2xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.35)] hover:border-[color:rgba(77,140,30,0.18)] transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[color:rgba(124,194,46,0.14)] rounded-full blur-2xl -z-10 transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[color:rgba(77,140,30,0.10)] rounded-full -z-10 transition-transform duration-700 group-hover:scale-125 opacity-50" />

                    <div className="h-14 w-14 bg-[linear-gradient(135deg,rgba(124,194,46,0.18),rgba(77,140,30,0.12))] rounded-2xl flex items-center justify-center mb-6 text-primary ring-1 ring-[color:rgba(77,140,30,0.18)] shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Clock className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-zinc-900 mb-1.5 text-lg group-hover:text-primary transition-colors">Working Hours</h4>
                    <p className="text-sm text-zinc-500 mb-5">We are open on these times.</p>
                    <span className="text-sm font-medium text-zinc-800 leading-relaxed">Mon-Fri: 9:00 AM - 6:00 PM<br />Sat-Sun: Closed</span>
                </div>
            </div>

            {/* Map or Image Placeholder */}
            <div className="relative h-[300px] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                            <MapPin className="w-3.5 h-3.5" />
                            Headquarters
                        </div>
                        <p className="text-white font-medium">Dhaka, Bangladesh</p>
                    </div>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="h-10 w-10 bg-white text-primary rounded-full flex items-center justify-center hover:bg-secondary transition-colors shadow-lg">
                        <Globe className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
