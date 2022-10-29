import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
	faCheck,
	faTimes,
	faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = "api/user";

const Registration = (props) => {
	const { setLoginView, loginView } = props;

	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const result = USER_REGEX.test(user);
		// console.log(result);
		// console.log(user);
		setValidName(result);
	});

	useEffect(() => {
		const PwdResult = PWD_REGEX.test(pwd);
		setValidPwd(PwdResult);
		const match = pwd === matchPwd;
		setValidMatch(match);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd, matchPwd]);

	const handleSubmit = async (e) => {
		// if button is hacked
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg("invalid Entry");
			return;
		}
		// console.log(user, pwd);
		setSuccess(true);
		try {
			const response = await axios.post(
				REGISTER_URL,
				JSON.stringify({ user, pwd }),
				{
					headers: { "content-Type": "application" },
				}
			);
		} catch (err) {}
		setSuccess(true);
		setLoginView("login");
	};

	return (
		<>
			{success ? (
				<div>
					<h1>Welcome {user} to You GET EAT journey</h1>
					<button
						onClick={() => {
							setLoginView("login");
						}}
					>
						Log in
					</button>
				</div>
			) : (
				<div className="registration">
					<p
						ref={errRef}
						className={errMsg ? "errmsg" : "offscreen"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h3>Register</h3>
					<form>
						<label htmlFor="username">
							Username
							<span className={validName ? "valid" : "hide"}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							<span className={validName || !user ? "hide" : "invalid"}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<br />
						<input
							type="username"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							required
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnte"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						></input>
						<br />
						<p
							id="idnote"
							className={
								userFocus && user && !validName ? "instructions" : "offscreen"
							}
						>
							<FontAwesomeIcon icon={faCheckCircle} />
							4 to 24 characters.
							<br />
							Must begin with a letter.
							<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>
						<br />
						<label htmlFor="password">
							Password
							<FontAwesomeIcon
								icon={faCheck}
								className={validPwd ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validPwd || !pwd ? "hide" : "invalid"}
							/>
						</label>
						<br />
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p
							id="pwdnote"
							className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
						>
							<FontAwesomeIcon icon={faCheckCircle} />
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters and a number
							<br />
							Allowed special characters:{" "}
							<span aria-label="exclamation mark">!</span>{" "}
							<span aria-label="at symbol">@</span>{" "}
							<span aria-label="hashtag">#</span>{" "}
							<span aria-label="dollar sign">$</span>{" "}
							<span aria-label="percent">%</span>
						</p>
						<br />
						<br />

						<label htmlFor="confirm_pwd">
							Confirm Password
							<FontAwesomeIcon
								icon={faCheck}
								className={validMatch && matchPwd ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validMatch || !matchPwd ? "hide" : "invalid"}
							/>
						</label>
						<br />
						<input
							type="password"
							id="confirm_pwd"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<br />
						<p
							id="confirmnote"
							className={
								matchFocus && !validMatch ? "instructions" : "offscreen"
							}
						>
							<FontAwesomeIcon icon={faCheckCircle} />
							Must match the first password input field.
						</p>
						<br />

						<button
							disabled={!validName || !validPwd || !validMatch ? true : false}
							onClick={() => {
								handleSubmit();
							}}
						>
							Sign Up
						</button>
						<br />
						<br />
						<br />
					</form>
					Already registered?
					<button
						ClassName="login"
						onClick={() => {
							setLoginView("login");
						}}
					>
						Log in here
					</button>
				</div>
			)}
		</>
	);
};

export default Registration;
