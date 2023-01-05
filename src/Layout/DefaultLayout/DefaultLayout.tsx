
import classNames from 'classnames';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

type Props = {
  children: React.ReactElement;
};

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className={cx('side-bar')}>

      </div>
      <div className="main">
        {children}
      </div>
    </>
  )
}

export default DefaultLayout