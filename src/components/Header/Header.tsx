import React, { useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
// import { FiMenu } from 'react-icons/fi'
import './Header.css'

const Header = () => {
	const [darkMode, setDarkMode] = useState(false)

	const toggleDarkMode = () => {
		if (darkMode) {
			document.body.classList.toggle('dark-mode', false)
			setDarkMode(false)
		} else {
			document.body.classList.toggle('dark-mode', true)
			setDarkMode(true)
		}
	}

	return (
		<header className='header'>
			<div className='header-container'>
				<div className='header-content'>
					{/* Hamburger Menu Icon*/}
					{/* <div className='header-left'>
						<button
							aria-label="Menu"
							className="header-button"
						>
							<FiMenu className="header-icon" />
						</button>
					</div> */}

					{/* Title */}
					<div className="header-center">
						<h1 className="header-title">
							CertifyPro
						</h1>
					</div>

					{/* Dark Mode Toggle */}
					<div className='header-right'>
						<button
							aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
							onClick={toggleDarkMode}
							className="header-button"
						>
							{darkMode ? (
								<FiSun className="header-icon" />
							) : (
								<FiMoon className="header-icon" />
							)}
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header