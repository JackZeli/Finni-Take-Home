import { Input, Select } from "antd";
import './SearchBar.css'


function SearchBar ({ onType, onSelect }) {
	return (
		<div className="searchBar">
	      <Select onChange={onSelect} placeholder="Select a Category to Search">
	        <Option value="firstname">First Name</Option>
	        <Option value="middlename">Middle Name</Option>
	        <Option value="lastname">Last Name</Option>
	        <Option value="dob">Date of Birth</Option>
	        <Option value="status">Status</Option>
	        <Option value="address">Address</Option>
	      </Select>
	      <Input onChange={onType} placeholder="Search" />

	    </div>
	)
}

export default SearchBar;