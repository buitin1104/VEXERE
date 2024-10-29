import React from 'react'
import SideBarSearch from './SideBarSearch'
import SearchResult from './SearchResult'

export default function SearchPage() {
	return (
		<div className="mx-auto max-w-full px-5 pb-24 pt-10 lg:max-w-[80%] lg:px-0 2xl:max-w-[60%]">
			<div className="flex flex-row">
				<div className="w-1/4">
					<SideBarSearch />
				</div>
				<div className="w-[3/4]">
					<SearchResult />
				</div>
			</div>
		</div>
	)
}
