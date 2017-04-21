import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import {hashHistory} from 'react-router';

const options = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 
  'Jun', 'Jul', 'Aug', 'Sep', 
  'Oct', 'Nov', 'Dec']

class SignupForm extends React.Component  {
  constructor(props){
    super(props);
    this.state= {fname: "", lname: "", email: "", password: "", 
                 month: "", date:"", year:"", gender: ""}
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return(e) => {
      this.setState({[field]: e.currentTarget.value})
    };
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.signup(user);
  }

  setGender(e) {
    this.setState({gender: e.target.value})
  }

  render() {
    const months = options.map((month, i) => {
      return <option key={i} value={month}>{month}</option>
    });
    const allDays = [...Array(32).keys()]
    allDays.splice(0,1);

    const allYears = [];
    for (let i = 2017; i >= 1905; i--) {
       allYears.push(i)
    }
    const years = allYears.map(y => <option key={y} value={y}>{y}</option>)
    const days = allDays.map(d => <option key={d} value={d}>{d}</option>)

    days.unshift(<option key='d' value='d'>Day</option> );
    months.unshift(<option key='m' value='m'>Month</option> );
    years.unshift(<option key='y' value='y'>Year</option> );

    return(
      <div className="signup-header-background">
      <div className="signup-header-container">
        <div className="signup-lefthand-words">
          <h3 className="signup-connect">
            Connect with friends and the 
            <br/>
            world around you on Fafbook.
          </h3>
          <ul className="signup-lefthand-list">
            <li className="signup-lefthand-list-item">
              <i className="fa fa-camera-retro fa-fix" aria-hidden="true"></i>
              <span className="bold-words">
              See photos and updates</span> from friends in News Feed.</li>
            <li className="signup-lefthand-list-item">
              <i className="fa fa-share-alt-square" aria-hidden="true"></i>
              <span className="bold-words">
              Share what's new</span> in your life on your Timeline.</li>
            <li className="signup-lefthand-list-item">
              <i className="fa fa-search" aria-hidden="true"></i>
              <span className="bold-words">
              Find more</span> of what you're looking for with Fafbook Search.</li>
          </ul>
        </div>
        <form onSubmit={this.handleSubmit} className="signUp-form-box">
        <h3 className="signup-big">Sign Up</h3>
        <p id="snark"> It's free and always will be.</p>
        <br/>
       <input
          type="text"
          value={this.state.fname}
          onChange={this.update('fname')}
          className={`signup-input signup-fname ${this.props.errors.fname ? 'signup-errors' : ''}`}
          placeholder="  First name"/>
        <input
          type="text"
          value={this.state.lname}
          onChange={this.update('lname')}
          className={`signup-input signup-lname ${this.props.errors.lname ? 'signup-errors' : ''}`}
          placeholder="  Last name"/>
        <br/>
        <input
          type="text"
          value={this.state.email}
          onChange={this.update('email')}
          className={`signup-input signup-email ${this.props.errors.email ? 'signup-errors' : ''}`}
          placeholder="  Email"/>
        <br/>
        <input
          type="password"
          value={this.state.password}
          onChange={this.update('password')}
          className={`signup-input signup-password ${this.props.errors.password ? 'signup-errors' : ''}`}
          placeholder="  New password"/>
        <div className="signup-birthday">

          Birthday
          <div className="signup-birthday">
            <select
              className={`signup-input signup-month ${this.props.errors.month ? 'signup-errors' : ''}`}
              value={this.state.month}
              onChange={this.update('month')}
            >
              {months}
            </select>
            <select
              className={`signup-input signup-date ${this.props.errors.date ? 'signup-errors' : ''}`}
              value={this.state.date}
              onChange={this.update('date')}
            >
              {days}
            </select>
            <select
              className={`signup-input signup-year ${this.props.errors.year ? 'signup-errors' : ''}`}
              value={this.state.year}
              onChange={this.update('year')}
            >
              {years}
            </select>
          </div>
        </div>
        
        <div className=
              {`signup-input signup-gender `}
           onChange={event => this.setGender(event)}>
           <div className={`signup-gender-choice ${this.props.errors.gender ? 'signup-errors' : ''}`} >
             <input className={`signup-input signup-gender-choice ${this.props.errors.gender ? 'signup-errors' : ''}`} 
               type="radio" value={false} name="gender"/> Female
           </div>
           <div className={`signup-gender-choice ${this.props.errors.gender ? 'signup-errors' : ''}`} >
             <input className={`signup-input signup-gender-choice ${this.props.errors.gender ? 'signup-errors' : ''}`} 
               type="radio" value={true} name="gender"/> Male
           </div>
        </div>
        <input type="submit" onSubmit={this.handleSubmit} value="Create Account"/>
      </form>
    </div>
    </div>
    ) 
  }
}

const mapStateToProps = state => ({
  errors: state.session.errors
})

const mapDispatchToProps = dispatch => ({
  signup: (user) => dispatch(signup(user)).then(() => hashHistory.push('/'))
})

export default connect( mapStateToProps, mapDispatchToProps)(SignupForm);
