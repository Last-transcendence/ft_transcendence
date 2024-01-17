import styles from '@/style/loading/index.module.css';

const Loading = () => {
	return (
		<>
			<div className={styles.loading}>
				<section>
					<div className={styles.Message}>Loading...</div>
				</section>
				<div className={styles.lines}>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
				</div>
			</div>
		</>
	);
};

export default Loading;
