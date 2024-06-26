import React, { useState, useEffect, useCallback } from 'react';
import { Link } from '@inertiajs/inertia-react';
import Forum from '@/Layouts/Forum';
import Pagination from '@/Components/Pagination';
import { debounce, pickBy } from 'lodash';
import { Inertia } from '@inertiajs/inertia';
import Filter from '@/Components/Filter';
import { Menu } from '@headlessui/react';
const menus = [
    { label: 'latest', value: 'latest' },
    { label: 'oldest', value: 'oldest' },
    { label: 'line', value: '' },
    { label: 'My Questions', value: 'mine' },
    { label: 'My participation', value: 'participation' },
    { label: 'My answer', value: 'answer' },
    { label: 'line', value: '' },
    { label: 'popular this week', value: 'popular-this-week' },
    { label: 'popular all time', value: 'popular' },
    { label: 'line', value: '' },
    { label: 'solved', value: 'solved' },
    { label: 'unsolved', value: 'unsolved' },
    { label: 'line', value: '' },
    { label: 'no replies', value: 'no-replies' },
];

const ThreadSetting = ({ thread }) => {
    
    return (
        <Menu as="div" className='relative'>
            <Menu.Button>
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>

            </Menu.Button>
            <Menu.Items className="absolute right-0 mr-4 bg-white w-52 border shadow-sm rounded-lg overflow-hidden py-0.5 top-0">
                <Menu.Item>
                    <Link className="py-2.5 block hover:bg-gray-50 px-4" href={`/threads/${thread.slug}/edit`}>
                        Edit
                    </Link>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}
export default function Index(props) {
    const { filter, categories, auth } = props;
    const { data: threads, meta } = props.threads;
    const [keyword, setKeyword] = useState(filter.search);

    const reload = useCallback(
        debounce((q) => {
            Inertia.get('/threads', pickBy({ search: q, page: filter.page, filtered: filter.filtered, category: filter.category }), { preserveState: true });
        }, 500)
        , []);

    useEffect(() => reload(keyword), [keyword]);
    
    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                    <Menu as="div" className="relative">
                        <Menu.Button className="capitalize focus:outline-none bg-white rounded-lg px-4 w-full lg:w-52 py-2 shadow flex items-center justify-between">
                            {/* {filter.filtered ? filter.filtered : 'Filter'} */}
                            {filter.filtered == 'popular-this-week' ? 'Popular This Week' : filter.filtered == 'no-replies' ? 'No Replies' : !filter.filtered ? 'Filter' : filter.filtered}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Menu.Button>
                        <Menu.Items className="absolute mt-1 w-52 z-50 bg-white shadow rounded-lg overflow-hidden py-0.5">
                            {menus.map((menu, key) => {
                                return menu.label == 'line' ? <div key={key} className="h-px bg-gray-200 my-0.5 w-full" /> :
                                    <Menu.Item key={key}>
                                        <Link
                                            preserveState
                                            className={`block px-4 py-2 hover:bg-gray-100 font-medium capitalize text-sm`}
                                            href={`/threads?filtered=${menu.value}`}
                                        >
                                            {menu.label}
                                        </Link>
                                    </Menu.Item>
                            })}
                        </Menu.Items>
                    </Menu>
                    <Filter categories={categories} initialState={filter.category} />
                </div>
                <div className="bg-white flex items-center overflow-hidden shadow rounded-lg px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="h-10 p-0 focus:outline-none focus:ring-transparent focus:border-transparent border-0" type="text" placeholder="Search..." name="search" id="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                </div>
            </div>
            {threads.length ? threads.map(thread => (
                <div className="bg-white flex gap-x-4 p-4 rounded-lg shadow" key={thread.id}>
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={thread.user.picture} alt={thread.user.name} />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <Link href={route('threads.show', thread.slug)}>
                                <h1>{thread.title}</h1>
                            </Link>
                            {auth.user.id == thread.user.id ?
                                <ThreadSetting thread={thread} />
                                : ''}
                        </div>
                        <div className="leading-relaxed text-sm mb-3 text-gray-500">
                            {thread.teaser}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm gap-x-4">
                                <div className="text-blue-500 font-semibold">{thread.user.name}</div>
                                <Link href={`/threads?category=${thread.category.slug}`} className="hidden md:block text-gray-500 font-semibold text-sm">{thread.category.name}</Link>
                                <span className="text-gray-500 hidden md:block">{thread.created_at}</span>
                            </div>
                            <div className="flex items-center text-sm gap-x-4">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 inline" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-1">{thread.likes_count}</span>
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span className="ml-1">{thread.replies_count}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )) :
                <div className="bg-white border border-dashed p-10 text-center text-gray-800 rounded-2xl">
                    No threads.
                </div>
            }
            <Pagination meta={meta} />
        </div>
    );
}
Index.layout = page => <Forum children={page} title="Threads" />;
