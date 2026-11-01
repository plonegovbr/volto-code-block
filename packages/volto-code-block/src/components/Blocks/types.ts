/** Values stored by the block's styling fields. */
export interface BlockStyles {
  align?: string;
  size?: string;
}

/** Caption and styling fields shared by all the blocks. */
export interface CaptionedBlock {
  caption_title?: string;
  caption_description?: string;
  styles?: BlockStyles;
}
