import Hero from '@/Components/Hero';
import App from '@/Layouts/App';
import React from 'react';

export default function Dashboard(props) {
    const { data: threads, meta } = props.threads;


    const reload = useCallback(
        debounce((q) => {
            Inertia.get('/threads', pickBy({ search: q, page: filter.page, filtered: filter.filtered, category: filter.category }), { preserveState: true });
        }, 500)
        , []);

    useEffect(() => reload(keyword), [keyword]);

    return (
        <Hero>
            <div className="container">
                <h1 className="font-bold text-black tracking-tighter text-xl sm:text-3xl lg:text-6xl">
                    Your Statistic
                </h1>
            </div>
        </Hero>
    );
}

Dashboard.layout = page => <App children={page} />;
