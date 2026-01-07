"use client";

export default function Location() {
    return (
        <section className="relative w-full border-grid-b" id="location">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
                {/* Left: Info */}
                <div className="p-8 md:p-16 border-grid-r border-b md:border-b-0 bg-background flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-display font-bold uppercase mb-8">Visit Us</h2>
                        <div className="space-y-4 font-mono text-lg text-gray-300">
                            <p>Night Market (Chợ đêm)</p>
                            <p>An Thượng, Sơn Trà</p>
                            <p>Da Nang 50000</p>
                            <p>Vietnam</p>
                        </div>
                    </div>

                    <div className="mt-12 space-y-2">
                        <p className="font-display text-xl uppercase">Opening Hours</p>
                        <div className="flex justify-between max-w-xs font-mono text-gray-400">
                            <span>Mon - Sun</span>
                            <span>18:00 - 23:00</span>
                        </div>
                    </div>
                </div>

                {/* Right: Map */}
                <div className="relative w-full h-[400px] md:h-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.110232675685!2d108.24146331485834!3d16.0597580888868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f2ced6d8b%3A0xeac35f2960ca74a4!2sAn%20Thuong%20Night%20Market!5e0!3m2!1sen!2s!4v1679000000000!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}
