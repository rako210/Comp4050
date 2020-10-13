import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { ApplyButton } from '../common/Button'
import './Card.css'

export class AllTaskCard extends React.Component {
    render() {
      return (
        <div className="box">
          <div className="card-header">
            <div className="card-col1">
              <div className="flex-box">
                <div>
                  <h2>{this.props.data.title}</h2>
                </div>
                <div>
                  <h2>#{this.props.data.category}</h2>
                </div>
              </div>
            </div>
            <div className="card-col2">
              <h2>{this.props.data.cost} Points</h2>
            </div>
          </div>

          <div className="card-body">
            <div className="card-col1">
              <p>{this.props.data.description}</p>
            </div>
            <div className="card-col2">
              <div className="top">
                <p>{this.props.data.location}</p>
                <p><UserOutlined /> {this.props.data.name}</p>
                <p>{this.props.data.status}</p>
                <p><ApplyButton {...this.props}></ApplyButton></p>
              </div>
              <div className="bot">
                <p>{this.props.data.time}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  